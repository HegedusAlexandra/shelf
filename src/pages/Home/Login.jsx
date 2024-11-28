import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Login() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center overflow-hidden bg-ab2 bg-no-repeat bg-cover bg-center">
        <div className=" absolute z-10 lg:p-[4vw] lg:px-[20vw] p-[14vw] px-[14vw] bg-white/40 backdrop-blur-md flex items-center justify-center rounded-full">   
            <Auth
              supabaseClient={supabase}
              providers={[]} 
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      defaultButtonBackground: 'transparent',
                    },
                  },
                },
              }}
              localization={{
                lang: 'hu',
              }}
            />
        </div>
      </div>
    );
  } else {
    navigate("/dashboard");
  }
}
