import { FcEmptyTrash } from "react-icons/fc";
import moment from "moment";

export const Empty = ({ message }) => {
  return (
    <div className="flex-colo w-full py-12 px-4 rounded border border-border bg-white gap-4">
      <div className="flex-colo w-24 h-24 p-5 rounded-full bg-dry text-primary text-4xl">
        <FcEmptyTrash className="bg-primary text-primary"/>
      </div>
      <p className="text-border text-sm">{message}</p>
    </div>
  );
};

export const shortUppercaseId = (id) => {
  return id.slice(0, 8).toUpperCase();
};

export const DateFormat = (date) => {
  return moment(date).format("LL");
};
