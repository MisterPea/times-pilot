interface LabelProps {
  label: string;
  size?: "lg" | "md" | "smMd" | "sm" | "xSm";
}
export default function Label({ label, size = "lg" }: LabelProps) {
  return (
    <>
      {size === "lg" && <h1 className="non_clickable_label --large">{label}</h1>}
      {size === "md" && <h2 className="non_clickable_label --medium">{label}</h2>}
      {size === "smMd" && <h2 className="non_clickable_label --small_medium">{label}</h2>}
      {size === "sm" && <p className="non_clickable_label --small">{label}</p>}
      {size === "xSm" && <p className="non_clickable_label --x_small">{label}</p>}
    </>
  );
}