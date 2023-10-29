import { Outlet } from "react-router-dom";
import Nav from '../components/Nav'

interface LayoutProps {
  cookies: any
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Nav cookies={props.cookies} />
      <Outlet />
    </>
  )
};

export default Layout;