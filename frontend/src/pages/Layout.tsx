import { Outlet, Link } from "react-router-dom";
import Nav from '../components/Nav'

interface LayoutProps {
  userID: number,
  username: string,
  userRole: string
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Nav userID={props.userID} username={props.username} userRole={props.userRole} />
      <Outlet />
    </>
  )
};

export default Layout;