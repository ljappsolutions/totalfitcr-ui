import React, { useContext } from "react"
import AppointmentContext, { IAppointmentContext } from "../shared/contexts/appointment";

export const Summary: React.FunctionComponent = () => {
  const context = useContext<IAppointmentContext | null>(AppointmentContext);
  return (
    <>
    </>
  )  
}