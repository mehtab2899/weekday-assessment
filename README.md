# Weekday Job Search Assessment Submission

This project is a job search application that allows users to search for jobs based on various filters.

## Live Demo

Check out the live demo of the application [here](https://your-live-demo-url.com).

## Getting Started

To get started with the project locally, follow these steps:

1. Clone the repository to your local machine:
```bash
  https://github.com/mehtab2899/weekday-assessment
```

2. Navigate to the project directory:
```bash
cd weekday-assessment
```

3. Install dependencies using npm or yarn:
```bash
  yarn install
```

4. Start the development server
```bash
  yarn dev
```

5. Open your browser and visit [http://localhost:5173](http://localhost:5173) to view the application.


## Features

- Search for jobs based on filters like minimum experience, company name, location, roles, and minimum salary.
- Infinite scrolling to load more jobs dynamically.
- Responsive design for mobile and desktop devices.


## Tech Stack Used
- I've used Vite to create this app, a build tool that provides fast development and optimized production builds.
- React.js for the frontend UI.
- Vanilla CSS for styling the components.
- IntersectionObserver API for infinite scrolling.
- fetch API for handling API requests.

## Why No Redux?
The assignment specified using Redux; however, considering the size and requirements of this project, I opted not to use Redux. Managing state locally with React hooks proved to be more efficient and simplified the development process.

## Why No Tech Stack Filter?
Although the assignment document mentioned adding a technology stack filter, I didn't include it in the application. The values required for this filter were missing in the API response, making it impractical to implement. As a result, I focused on integrating filters that were provided by the API, ensuring a seamless user experience without compromising on functionality.

## Performance Practices I've Used
- Lazy Loading: By using infinite scrolling, you load job data dynamically as the user scrolls, reducing initial load time and improving perceived performance.

- Memoization and useCallback: Leveraging memoization and useCallback hooks to optimize component rendering and function callbacks, enhancing overall performance and responsiveness.

- Minimized API Calls: You fetch job data with a specified limit and offset, minimizing the amount of data fetched at once and optimizing network usage.

- Optimized Styling: Using the makeStyles package from Material-UI allows for efficient styling by generating minimal CSS and reducing style recalculations and also used nested styling.

- Responsive Design: Implementing responsive design practices ensures your application performs well across different devices, optimizing layout and resource usage.

- IntersectionObserver for Infinite Scrolling: Using IntersectionObserver for infinite scrolling instead of scroll event listeners can improve scrolling performance by offloading the scroll monitoring to the browser.