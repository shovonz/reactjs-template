import ChildDays from "./ChildDays";

// props={}
export default function Days({ days }) {
  return (
    <div>
      <div>
        Child:
        <ChildDays days={days} />
      </div>
    </div>
  );
}
