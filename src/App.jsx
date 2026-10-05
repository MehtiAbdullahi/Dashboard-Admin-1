import route from "./routes";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { supabase } from "./lib/supabase";
import {
  clearSession,
  fetchUserProfileImage,
  fetchUserRole,
  initializeAuth,
  setSession,
} from "./Redux/Store/authSlice";

function App() {
  const dispatch = useDispatch();
  const { session } = useSelector((state) => state.auth);

  const userId = session?.user?.id;

  // ! Start Web Language

  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.language;

    document.documentElement.lang = language;

    document.documentElement.dir = language === "en" ? "ltr" : "rtl";
  }, [i18n.language]);

  // ! End Web Language

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

  useEffect(() => {
    if (session) {
      dispatch(fetchUserProfileImage());
    }
  }, [session, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRole());
    }
  }, [userId, dispatch]);

  const routes = useRoutes(route);

  return <>{routes}</>;
}

export default App;
