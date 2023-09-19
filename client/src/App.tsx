import { useEffect } from "react";

import { Header, Loading, router } from "./components";
import { useAppDispatch } from "src/redux/store";
import { refreshToken } from "src/redux/actions/authAction";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      <Loading />

      <main>
        <div className="container">{router()}</div>
      </main>
    </div>
  );
}

export default App;
