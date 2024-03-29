import React, { useEffect } from 'react';
import styles from './App.module.less';
import { useSelector } from './redux/hooks';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import {
  Home,
  SignIn,
  Register,
  Detail,
  Search,
  ShoppingCart,
  Order
} from './pages'
import { useDispatch } from 'react-redux';
import { getShoppingCart } from './redux/shoppingCart/slice';

// 私有化路由函数
// isAuthenticated： 判定是否登录
const PrivateRoute = (props: any) => {
  const { children, isAuthenticated } = props
  return isAuthenticated ? (
    // 如果用户有权限，返回组件本身
    children
  ) : (
    // 如果用户没有授权，那么用户会重定向到登录页面
    <Navigate to={`/signIn`} />
  )
}

function App() {
  const jwt = useSelector(s => s.user.token)
  const dispatch = useDispatch()
  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles["App"]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/detail/:touristRouteId' element={<Detail />} />
          {/* 如果不加?那么不输入字符直接搜索url变成/search/就会匹配到404页面而不会匹配到该路由 */}
          <Route path='/search/:keyword?' element={<Search />} />
          <Route
            path='/shoppingCart'
            element={
              <PrivateRoute isAuthenticated={jwt !== null}>
                <ShoppingCart />
              </PrivateRoute>
            }
          />
          <Route
            path='/order'
            element={
              <PrivateRoute isAuthenticated={jwt !== null}>
                <Order />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<h1>404 NOT FOUND 页面不存在</h1>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
