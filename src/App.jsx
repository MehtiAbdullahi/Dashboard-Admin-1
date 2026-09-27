import route from "./routes";
import "./App.css";
import { useNavigate, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { supabase } from "./lib/supabase";
import {
  clearSession,
  initializeAuth,
  setSession,
} from "./Redux/Store/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, session } = useSelector((state) => state.auth);

  // ! Start Web Language

  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.language;

    document.documentElement.lang = language;

    document.documentElement.dir = language === "en" ? "ltr" : "rtl";
  }, [i18n.language]);

  // ! End Web Language

  const fetchSession = async () => {
    if (error) {
      console.error(error);
      return;
    }

    setSession(session);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    if (session === null) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [session]);

  useEffect(() => {
    dispatch(initializeAuth());

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {

      if (session) {
        dispatch(setSession(session));
      } else {
        dispatch(clearSession());
      }
    });

    // پاک کردن Listener
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  const routes = useRoutes(route);

  return <>{routes}</>;
}

export default App;
