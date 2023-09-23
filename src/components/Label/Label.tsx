interface LabelProps {
  label: string;
  size?: "lg" | "md" | "sm";
}
export default function Label({ label, size = "lg" }: LabelProps) {
  return (
    <>
      {size === "lg" && <h1 className="non_clickable_label --large">{label}</h1>}
      {size === "md" && <h2 className="non_clickable_label --medium">{label}</h2>}
      {size === "sm" && <p className="non_clickable_label --small">{label}</p>}
    </>
  );
}