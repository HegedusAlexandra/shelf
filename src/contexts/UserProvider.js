import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return;
      }

      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        // Check if user exists in the `users` table
        const { data: userExists, error: selectError } = await supabase
          .from("users")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (selectError) {
          console.error("Error checking user existence:", selectError.message);
        }

        // If user does not exist, create one
        if (!userExists) {
          const { error: insertError } = await supabase.from("users").insert({
            id: currentUser.id,
            email: currentUser.email,
            created_at: new Date(), // Add other fields as needed
          });

          if (insertError) {
            console.error("Error creating user:", insertError.message);
          }
        }
      }
    };

    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        // Check and create logic here if needed, similar to fetchUser
        supabase
          .from("users")
          .select("*")
          .eq("id", currentUser.id)
          .single()
          .then(({ data: userExists, error: selectError }) => {
            if (selectError) {
              console.error("Error checking user existence:", selectError.message);
            }

            if (!userExists) {
              supabase.from("users").insert({
                id: currentUser.id,
                email: currentUser.email,
                created_at: new Date(),
              })
              .then(({ error: insertError }) => {
                if (insertError) {
                  console.error("Error creating user:", insertError.message);
                }
              });
            }
          });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log(user);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
