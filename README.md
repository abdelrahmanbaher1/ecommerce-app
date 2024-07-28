# WeBook Task

## Requirements 📺

### To Built A Simple `E-Commerce Application` using `NextJS` , `Tailwind CSS`.   

### System Functionalities

- 
- Enabling user to Navigate through pages 



A Burger (Product) may have several ingredients:

-   150g Beef
-   30g Cheese
-   20g Onion

The system keeps the stock of each of these ingredients stored in the database. You
can use the following levels for seeding the database:

-   20kg Beef
-   5kg Cheese
-   1kg Onion

When a customer makes an order that includes a Burger. The system needs to update the
the stock of each of the ingredients so it reflects the amounts consumed.
Also when any of the ingredients' stock level reaches 50%, the system should send an
email message to alert the merchant that they need to buy more of this ingredient.

In the sections below, I will explain the architecture, decisions, and thoughts.

## Installation

1. Install Dependencies:

    ```bash
    yarn install
    ```

2. Run Local Development:

    ```
    yarn run dev
    ```
3. Enjoy your `Experience` !

### Create Order Endpoint:

```
POST /api/v1/orders
```

Request:

```json
{
    "merchantId": 1,
    "products": [
        {
            "product_id": 1,
            "quantity": 1
        }
    ]
}
```

## Deep-Dive!

The Project uses real APIs for data management  is built to be dependable, able to handle many orders at once, and be straightforward to test while maintaining high-quality standards.

### System Architecture

![Untitled Diagram drawio (2)](https://github.com/iifawzi/foodi/assets/46695441/a6f7d9b2-3a02-48aa-86e9-e45ec4f50dc8)

Anticipating and mitigating Murphy's Law `if anything can go wrong, it will`, the system architecture takes into account potential challenges:

-   `Concurrency` Challenge: when multiple orders are happening at once, there's a chance they could all think there are enough ingredients, leading to issues like overselling or running out of stock.

-   Mailing Service Reliability: Proactive measures are in place to address potential issues with sending emails. This includes scenarios where the mailing service is non-operational or the mailing queue experiences downtime.

For the concurrency challenge it depends on a lot of factors, what the business is expecting? is it required to respond immediately to the user? or can we `queue` it and respond later with either confirmation or cancellation? I chose to respond immediately and synchronously.

to handle this, I used `transactions` with `exclusive locks`. All operations involved in processing the order, from checking the ingredient stocks to confirmation, are encapsulated within a transaction. This ensures that either all steps succeed, maintaining data consistency, or the entire transaction fails, preventing inconsistent order confirmations. 

In addition to that, an `exclusive` lock is acquired when checking ingredient stocks. This lock ensures that only one order can access and modify the stock data at a time, preventing multiple orders from concurrently depleting the stock. The exclusive lock remains in place until the transaction is committed, safeguarding against race conditions during the critical confirmation phase.

https://github.com/iifawzi/foodi/blob/bf18902bd3a1d7f1a07700d68ceaf0feda75d472/src/Infrastructure/repositories/Eloquent/EloquentStockRepository.php#L16

on the other side, for second challenge, it's critical to notify the merchant about low stock. However, blocking order processing due to notification failures is not an option. 

Initially, the dispatcher was kept outside of the transaction to avoid hindering order flow. But, what if the system went down after order confirmation or if the notification queue was unavailable? This raised concerns about potential data loss.

- `Transactional Outbox`:
To ensure data integrity, the idea of an `outbox` table was introduced. Besides keeping the dispatcher separate, now, the notification log itself is part of the actual transactions. When an order is confirmed, the system logs the notification details in an `low_stock_notification` table if any ingredients ran low. If everything runs smoothly, this log is committed with the transaction. Later, when the worker performs the send mail action, it marks it as `SENT`. otherwise, it's still pending. 

now what happens for pending notifications if they stuck?

- `Scheduler for Resilience`:
To handle scenarios where the queue might be down or the system faces disruptions after order confirmation - notifications are still pending in db - a scheduler was implemented. This scheduler regularly checks the `low_stock_notification`, specifically the outbox table, every 15 minutes. If it discovers any stuck notifications (those not marked as SENT, hasn't been updated for 30 min ), it dispatches them to the queue for processing.

We also needed to keep in mind that it might fail for the second time, we need to ensure that the job is dispatched only once. for that, we're retrieving and updating the updated_at in a transaction, so we're sure the logic that pulls from db, doesn't pull it twice after it passes 30 min. 

https://github.com/iifawzi/foodi/blob/a7691f72648df499dfbcb219960a14081ed5ef8b/src/Infrastructure/repositories/Eloquent/EloquentStockNotificationRepository.php#L30-L47

This way, we're always sure that it can self-recover from failures, but still, if it can go wrong, it it will. We need to keep in account that a job might for any reason be dispatched twice. We don't need to send the email twice `Idempotency`. For this, the job logic is not only retrieving by the notification id, but it also find by the status, and it update it immediately when sent. 

https://github.com/iifawzi/foodi/blob/a7691f72648df499dfbcb219960a14081ed5ef8b/src/Infrastructure/repositories/Eloquent/EloquentStockNotificationRepository.php#L49-L55

Some race conditions might still happen, the mail services usually can ensure `idempotency` as well, ensuring they're not sending the email twice. 

### Code Architecture

![Untitled-2023-12-02-0248](https://github.com/iifawzi/foodi/assets/46695441/36370bab-b3a9-4677-9471-eb21711daac1)

The way I've organized the code follows `SOLID` and `Hexagonal Architecture` principles, while isolating the domain layer following `Domain Driven Design` techniques, making the code modular, testable, and easier to maintain.

#### Files Structure

```
App
├── [locale]
│   ├── category
│   │   └── [categoryId]
│   │       ├── page.tsx
│   │       └── repositories
│   │           ├── MerchantRepository.php
│   │           ├── OrderRepository.php
│   │           ├── ProductRepository.php
│   │           ├── StockNotificationRepository.php
│   │           └── StockRepository.php
|   |── product 
|   |        └── page.tsx
│   └── services
│       └── OrderService.php
├── Components
│   ├── Common
│   │   ├── Ingredient.php
│   │   ├── Item.php
│   │   ├── Merchant.php
│   │   ├── Order.php
│   │   ├── StockItem.php
│   │   └── StockTransaction.php
│   ├── Services
│   │   └── OrderUseCases.php
│   └── Types
│       ├── OrderStatus.php
│       ├── StockItemStatus.php
│       └── StockTransactionType.php
└── Services
    ├── CategoryService.ts
    ├── ProductService.ts
    │   └── Eloquent
    │       ├── EloquentMerchantRepository.php
    │       ├── EloquentOrderRepository.php
    │       ├── EloquentProductRepository.php
    │       ├── EloquentStockNotificationRepository.php
    │       └── EloquentStockRepository.php
    └── types
        └── LowStockNotificationType.php
```

The business logic — the rules and processes we all understand — is encapsulated within the `Domain` directory. This is the common language that resonates with developers, stakeholders, program managers, and everyone involved in the project. It serves as a foundational agreement that unites us in our shared understanding. This also helped in testing and verifying the entire domain logic before thinking about any infrastructure details.

##### Key Components in the Domain

-   Entities:

The heart of the domain is the entities. These hold essential data, representing real-world concepts like orders, ingredients, and the specifics of the food we love. These entities act as the backbone of the system, defining what data we work with and how it relates.

Implemented entities: `Merchant`, `Item`, `Ingredient`, `stockItem`, `Order`, and `StockTransactions`. Stock Transaction contains all the transactions (logs) that occurs on the stocks.   

-   Use Cases:

Within the `use cases`, we zoom in on specific scenarios, like creating an order. Here, use cases focus on the detailed steps and logic involved in executing a particular use case. This approach keeps our business logic organized and easy to follow.

The only use-case is `CreateOrder`, it's responsible for checking the stocks and allocate the ingredients (`consume` call)

https://github.com/iifawzi/foodi/blob/5b2a2136debde1d6aadbfe33e4a5774d434c7741/src/Domain/Services/OrderUseCases.php#L18-L36

-   Isolation and Dependency Management

The domain is deliberately isolated, meaning it operates independently of any infrastructure-related logic. it allows us to maintain a clear distinction between what our system does (business logic) and how it does it (infrastructure logic).

https://github.com/iifawzi/foodi/blob/0aa62ae42c20c732d817cde111b30b846647c1e0/src/Application/services/OrderService.php#L15-L26

As you see, the dependencies are inverted, the service is communicating with the abstractions, and thanks to the Service providers, they're injected. 

https://github.com/iifawzi/foodi/blob/dbb5593ed7f34d5b0d6c237c870ca5e8f64fba39/app/Providers/AppServiceProvider.php#L32-L42

-   Dependency Injection:

as the code above shows, to facilitate this separation, we adopt a dependency injection approach. Instead of the application layer reaching out to infrastructure components, dependencies are injected into it, thanks to the defined interfaces.

This ensures flexibility and simplifies testing, as we can substitute real implementations with mocks, as we did in the integration tests.
where the entire business logic is tested using `in-memory` database. More on that, in the `Testing and Quality` section below.

https://github.com/iifawzi/foodi/blob/0aa62ae42c20c732d817cde111b30b846647c1e0/tests/Integration/Application/OrderServiceTest.php#L40-L54

The actual implementation of the repositories is on the infrastructure layer, where we can decide what to use, whether are we using `Eloquent` or any other solution, it doesn't matter. as long as they implement the repositories interfaces.

##### Application layer:

It mediates communication between core business logic (domain) and external systems (infrastructure), when ere I'm defining the `driven` ports, for external components to interact with the application layer.

The application layer is the layer that's responsible for the communication between the domain and the infrastructure, it defines the `driven` and `driving` ports.
for simplification in this project, I didn't implement any `driving` ports, the application service communicates directly with the domain's service. `driven` ports are defined in the repositories directory and the mail service. these ports must be implemented by anyone willing to interact/to be managed with/by the domain.

The application services are also infrastructure agnostic, hence you will notice that no `HTTP` errors are thrown for example, but instead, domain responses are returned.

https://github.com/iifawzi/foodi/blob/878ce9645f1655b725797233e122e71c468d004a/src/Application/services/OrderService.php#L57-L76

This gives us the flexibility of choosing any adapter in the infra, whether it's RPC, REST, or even socket layer. it doesn't matter.

##### Infrastructure layer:

The infrastructure layer serves as the foundation for a software system, housing implementations of the adapters both, the `repositories` and the `mailing service`. In this layer, you'll find the `eloquent` repositories implementations. on the other side, the `driven` adapters are defined in the core directory `app`. The infrastructure layer handles the technical and operational aspects that support the application's functionality.

### Testing and Quality - Continuous Integration

In the collaborative landscape of open source, I've gleaned invaluable insights into the pivotal role tests play. They not only enhance the reliability of code but also foster a collaborative and sustainable development environment. hence I always try to give testing a priority, I experienced a mess when we needed to do manual regression tests on systems that have been written for years. 

The domain logic is secured with focused `unit tests` validating each entity, while the use-case is ensured through `integration` tests employing a mocked database - thanks to di - to verify that it's working as expected, while the entire end-to-end functionality is verified using comprehensive `end-to-end` tests. Achieving a total coverage of 87% with 100% coverage of the core logic!

<img width="934" alt="Screenshot 2023-12-14 at 02 04 21" src="https://github.com/iifawzi/foodi/assets/46695441/7962d6d5-2b78-4df0-8e11-ceb6e3bc4f4f">

you can run the coverage test using: 

```php
php artisan test --coverage-html /coverage    
```

- please note that after running any tests, you need to refill the database if you will use it again outside the tests.

When it comes to the quality, PHPStan knows better. PHPStan for used for static analysis to enforce accurate typings and coding standards. Additionally, both PHPStan and PHPUnit are integrated into the Continuous Integration pipeline, triggering checks whenever any PHP file is pushed on main. 

<img width="1353" alt="image" src="https://github.com/iifawzi/foodi/assets/46695441/fdc98f09-cf5d-4e65-8d80-1f10e4e6052d">

## Thank you! 

Thank you for reading all of this, What makes a great code base and improves it, is having feedback from colleagues and experienced people like YOU (YES, the reader)👨🏻‍💻. if you came by this, I would love to hear your opinions/feedback and discuss different approaches, with you. 
## Installation

```jsx
npm i @aldabil/react-scheduler
```

## Usage

```jsx
import { Scheduler } from "@aldabil/react-scheduler";
```

## Example

```jsx
<Scheduler
  view="month"
  events={[
    {
      event_id: 1,
      title: "Event 1",
      start: new Date("2021/5/2 09:30"),
      end: new Date("2021/5/2 10:30"),
    },
    {
      event_id: 2,
      title: "Event 2",
      start: new Date("2021/5/4 10:00"),
      end: new Date("2021/5/4 11:00"),
    },
  ]}
/>
```

### Scheduler Props
All props are _optional_

| Prop                  | Value                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| height                | number. Min height of table. <br> _Default_: 600                                                                                                                                                                                                                                                                                                                                                                                            |
| view                  | string. Initial view to load. options: "week", "month", "day". <br> _Default_: "week" (if it's not null)                                                                                                                                                                                                                                                                                                                                    |
| agenda                | boolean. Activate agenda view                                                                                                                                                                                                                                                                                                                                                                                                               |
| alwaysShowAgendaDays  | boolean. if true, day rows without events will be shown                                                                                                                                                                                                                                                                                                                                                                                     |
| month                 | Object. Month view props. <br> _default_: <pre>{<br>weekDays: [0, 1, 2, 3, 4, 5], <br>weekStartOn: 6, <br>startHour: 9, <br>endHour: 17,<br>cellRenderer?:(props: CellProps) => JSX.Element,<br>navigation: true,<br>disableGoToDay: false<br>}</pre>                                                                                                                                                                                       |
| week                  | Object. Week view props. <br> _default_: <pre>{ <br>weekDays: [0, 1, 2, 3, 4, 5], <br>weekStartOn: 6, <br>startHour: 9, <br>endHour: 17,<br>step: 60,<br>cellRenderer?:(props: CellProps) => JSX.Element,<br>navigation: true,<br>disableGoToDay: false<br>}</pre>                                                                                                                                                                          |
| day                   | Object. Day view props. <br> _default_: <pre>{<br>startHour: 9, <br>endHour: 17, <br>step: 60,<br>cellRenderer?:(props: CellProps) => JSX.Element,<br>hourRenderer?:(hour: string) => JSX.Element,<br>navigation: true<br>}</pre>                                                                                                                                                                                                           |
| selectedDate          | Date. Initial selected date. <br>_Default_: new Date()                                                                                                                                                                                                                                                                                                                                                                                      |
| navigation            | boolean. Show/Hide top bar date navigation. <br>_Default_: true                                                                                                                                                                                                                                                                                                                                                                             |
| navigationPickerProps | CalendarPickerProps for top bar date navigation. Ref: [CalendarPicker API](https://mui.com/x/api/date-pickers/calendar-picker/#main-content)                                                                                                                                                                                                                                                                                                |
| disableViewNavigator  | boolean. Show/Hide top bar date View navigator. <br>_Default_: false                                                                                                                                                                                                                                                                                                                                                                        |
| events                | Array of ProcessedEvent. <br>_Default_: [] <br> <pre>type ProcessedEvent = {<br>event_id: number or string;<br>title: string;<br>subtitle?: string;<br>start: Date;<br>end: Date;<br>disabled?: boolean;<br>color?: string or "palette.path";<br>textColor?: string or "palette.path";<br>editable?: boolean;<br>deletable?: boolean;<br>draggable?: boolean;<br>allDay?: boolean;<br>agendaAvatar?: React.ReactElement \| string<br>sx?: Mui sx prop<br>} </pre> |
| eventRenderer         | Function(event:ProcessedEvent): JSX.Element.<br> A function that overrides the event item render function, see demo _Custom Event Renderer_ below                                                                                                                                                                                                                                                                                           |
| editable              | boolean. If `true`, the scheduler cell click will not open the editor, and the event item will not show the edit button, this is applied to all events, and can be overridden in each event property, see `ProcessedEvent` type.                                                                                                                                                                                                            |
| deletable             | boolean. Whether the event item will show the delete button, this is applied to all events, and can be overridden in each event property, see `ProcessedEvent` type.                                                                                                                                                                                                                                                                        |
| draggable             | boolean. Whether activate drag&drop for the events, this is applied to all events, and can be overridden in each event property, see `ProcessedEvent` type.                                                                                                                                                                                                                                                                                 |
| getRemoteEvents       | Function(RemoteQuery). Return promise of array of events. Can be used as a callback to fetch events by parent component or fetch.<br><pre>type RemoteQuery = { <br> start: Date;<br> end: Date;<br> view: "day" \| "week" \| "month";<br>}</pre>                                                                                                                                                                                            |
| fields                | Array of extra fields with configurations. <br> Example: <pre> { <br> name: "description", <br> type: "input" , <br> config: { label: "Description", required: true, min: 3, email: true, variant: "outlined", ....<br>}</pre>                                                                                                                                                                                                              |
| loading                 | boolean. Loading state of the calendar table                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |  |
| loadingComponent        | Custom component to override the default `CircularProgress`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| onConfirm               | Function(event, action). Return promise with the new added/edited event use with remote data. <br> _action_: "add", "edit"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| onDelete                | Function(id) Return promise with the deleted event id to use with remote data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| customEditor            | Function(scheduler). Override editor modal. <br> Provided prop _scheduler_ object with helper props: <br> <pre>{<br>state: state obj, <br>close(): void<br>loading(status: boolean): void<br>edited?: ProcessedEvent<br>onConfirm(event: ProcessedEvent, action:EventActions): void<br>}</pre>                                                                                                                                                                                                                                                                                                                                                                                 |
| customViewer            | Function(event: ProcessedEvent, close: () => void). Used to render fully customized content of the event popper. If used, `viewerExtraComponent` & `viewerTitleComponent` will be ignored                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| viewerExtraComponent    | Function(fields, event) OR Component. Additional component in event viewer popper                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| viewerTitleComponent    | Function(event). Helper function to render custom title in event popper                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| viewerSubtitleComponent | Function(event). Helper function to render custom subtitle in event popper                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| disableViewer    | boolean. If true, the viewer popover will be disabled globally                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| resources               | Array. Resources array to split event views with resources <br>_Example_ <pre>{<br>assignee: 1,<br>text: "User One", <br>subtext: "Sales Manager", <br>avatar: "https://picsum.photos/200/300", <br>color: "#ab2d2d",<br> }</pre>                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| resourceFields          | Object. Map the resources correct fields. <br>_Example_:<pre>{<br>idField: "admin_id", <br>textField: "title", <br>subTextField: "mobile",<br>avatarField: "title", <br>colorField: "background",<br>}</pre>                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| resourceHeaderComponent | Function(resource). Override header component of resource                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| resourceViewMode        | Display resources mode. <br>_Options_: "default" \| "vertical" \| "tabs"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| direction               | string. Table direction. "rtl" \| "ltr"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| dialogMaxWidth          | Edito dialog maxWith. Ex: "lg" \| "md" \| "sm"... _Default_:"md"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| locale                  | Locale of date-fns. _Default_:enUS                                                                                                                                                                                                                                                                                                    
| hourFormat              | Hour format. <br>_Options_: "12" \| "24"..._Default_: "12"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| timeZone                | String, time zone IANA ID: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| translations            | Object. Translations view props. <br> _default_: <pre>{<br> navigation: {<br> month: "Month",<br> week: "Week",<br> day: "Day",<br> today: "Today"<br> agenda: "Agenda"<br> },<br> form: {<br> addTitle: "Add Event",<br> editTitle: "Edit Event",<br> confirm: "Confirm",<br> delete: "Delete",<br> cancel: "Cancel"<br> },<br> event: {<br> title: "Title",<br> subtitle: "Subtitle",<br> start: "Start",<br> end: "End",<br> allDay: "All Day"<br>},<br> validation: {<br> required: "Required",<br> invalidEmail: "Invalid Email",<br> onlyNumbers: "Only Numbers Allowed",<br> min: "Minimum {{min}} letters",<br> max: "Maximum {{max}} letters"<br> },<br> moreEvents: "More...",<br> noDataToDisplay: "No data to display",<br> loading: "Loading..."<br>}</pre> |
| onEventDrop             | Function(event: DragEvent<HTMLButtonElement>, droppedOn: Date, updatedEvent: ProcessedEvent, originalEvent: ProcessedEvent). Return a promise, used to update remote data of the dropped event. Return an event to update state internally, or void if event state is managed within component                                                                                                                                                                                                                                                                                                                                                                                                                      |
| onEventClick            | Function(event: ProcessedEvent): void. Triggered when an event item is clicked                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| onEventEdit             | Function(event: ProcessedEvent): void. Triggered when an event item is being edited from the popover                                                                                                                                                                                                                                                                                                                                                       |            
| onCellClick             | Function(start: Date, end: Date, resourceKey?: string, resourceVal?: string | number): void. Triggered when a cell in the grid is clicked  |                                                                                                                                            
| onSelectedDateChange    | Function(date: Date): void. Triggered when the `selectedDate` prop changes by navigation date picker or `today` button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| onViewChange            | Function(view: View, agenda?: boolean): void. Triggered when navigation view changes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| stickyNavigation        | If true, the navigation controller bar will be sticky                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| onClickMore           | Function(date: Date, goToDay: Function(date: Date): void): void. Triggered when the "More..." button is clicked, it receives the date and a `goToDay` function that shows a day view for a specfic date.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                             

<br>

### SchedulerRef

Used to help manage and control the internal state of the `Scheduler` component from outside of `Scheduler` props, Example:

```js
import { Scheduler } from "@aldabil/react-scheduler";
import type { SchedulerRef } from "@aldabil/react-scheduler/types"

const SomeComponent = () => {
  const calendarRef = useRef<SchedulerRef>(null);

  return <Fragment>
    <div>
      <Button onClick={()=>{
        calendarRef.current.scheduler.handleState("day", "view");
      }}>
        Change View
      </Button>
      <Button onClick={()=>{
        calendarRef.current.scheduler.triggerDialog(true, {
          start: /*Put the start date*/,
          end: /*Put the end date*/
        })
      }}>
        Add Event Tomorrow
      </Button>
    </div>

    <Scheduler
      ref={calendarRef}
      events={EVENTS}
      //...
    />
  </Fragment>
};
```

The `calendarRef` holds the entire internal state of the Scheduler component. Perhaps the most useful method inside the `calendarRef` is `handleState`, example:

```
calendarRef.current.scheduler.handleState(value, key);
```

consider looking inside `SchedulerRef` type to see all fields & methods available.

### Demos

- [Basic](https://codesandbox.io/p/sandbox/standard-x24pqk)
- [Remote Data](https://codesandbox.io/s/remote-data-j13ei)
- [Custom Fields](https://codesandbox.io/s/custom-fields-b2kbv)
- [Editor/Viewer Override](https://codesandbox.io/s/customeditor-tt2pf)
- [Resources/View Mode](https://codesandbox.io/s/resources-7wlcy)
- [Custom Cell Action](https://codesandbox.io/s/custom-cell-action-n02dv)
- [Custom Event Renderer](https://codesandbox.io/s/custom-event-renderer-rkf4xw)

### Todos

- [ ] Tests
- [x] Drag&Drop - partially
- [ ] Resizable
- [ ] Recurring events
- [x] Localization
- [x] Hour format 12 | 24
