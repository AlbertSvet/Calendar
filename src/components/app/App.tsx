import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
import HistoryPage from "../../pages/history/HistoryPage";
import PageError from "../../pages/404/404";
import { AppointmentContextProvider } from "../../context/appoint/AppointContext";

import "./app.scss";

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root/>,
		errorElement: <PageError/>,
		children: [
			{
				path: '/',
				element: <SchedulePage/>
			},
			{
				path: '/schedulePage',
				element: <SchedulePage/>
			},
			{
				path: '/historyPage',
				element: <HistoryPage/>
			},
		

		]
	}
])

function App() {
	
	return <RouterProvider router = {router}/>
}

function Root() {
	return (
		<main className="board">
			<Header />
			<AppointmentContextProvider>
				<Outlet/>
			</AppointmentContextProvider>
			{/* <HistoryPage /> */}
			{/* <CancelModal /> */}
		</main>
	)
}

export default App;
