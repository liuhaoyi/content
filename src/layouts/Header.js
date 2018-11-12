import { Menu, Icon } from 'antd';
import Link from 'umi/link';

function Header({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/">
        <Link to="/account/signin">Signin</Link>
      </Menu.Item>
      <Menu.Item key="/umi">
        <Link to="/main">main</Link>
      </Menu.Item>
      <Menu.Item key="/list">
        <Link to="/list">list</Link>
        {/* <a href="/list">dva</a> */}
      </Menu.Item>
      <Menu.Item key="/detail">
        <Link to="/detail">detail</Link>
        {/* <a href="/detail" >detail</a> */}
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
      </Menu.Item>

    </Menu>
  );
}

export default Header;
