import { type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState, setModel } from "../../store";


export default function ModelSelector(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const {model} = useSelector((state: RootState) => state.chats.currentChat);

  return <select value={model} onChange={(e) => dispatch(setModel(e.target.value))}>
    <option value="gpt-4o-mini">GPT-4o Mini</option>
    <option value="gpt-5-nano">GPT-5 Nano</option>
    <option value="gpt-5-mini">GPT-5 Mini</option>
  </select>
}