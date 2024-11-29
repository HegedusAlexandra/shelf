import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Login() {
  const [session, setSession] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Fetch session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setSession(session);
        if (session?.user) {
          setUserId(session.user.id);
        }
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUserId(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, userId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center overflow-hidden bg-ab2 bg-no-repeat bg-cover bg-center">
        <div className="absolute z-10 lg:p-[4vw] lg:px-[20vw] p-[14vw] px-[14vw] bg-white/40 backdrop-blur-md flex items-center justify-center rounded-full">
          <Auth
            supabaseClient={supabase}
            providers={[]}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    defaultButtonBackground: "transparent",
                  },
                },
              },
            }}
            localization={{
              lang: "hu",
            }}
          />
        </div>
      </div>
    );
  }

  return null; // Prevent unnecessary rendering
}
