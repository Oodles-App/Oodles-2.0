import { logout } from "../redux/user";
import { useDispatch } from "react-redux";
import Home from './home';

export default function Landing() {
  const dispatch = useDispatch();
  return (
    <Home />
  );
}
