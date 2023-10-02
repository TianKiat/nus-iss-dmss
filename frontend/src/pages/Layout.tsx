import { Outlet, Link } from "react-router-dom";
import Nav from '../components/Nav'

interface LayoutProps {
  userID: number,
  username: string
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Nav userID={props.userID} username={props.username} />
      <Outlet />
    </>
  )
};

export default Layout;