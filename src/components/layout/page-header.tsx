type PageHeaderProps = {
  title: string;
  lead?: string;
  className?: string;
};

export function PageHeader({ title, lead, className = "mb-12 max-w-2xl" }: PageHeaderProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h1 className="type-page-title">{title}</h1>
      {lead && <p className="type-page-lead">{lead}</p>}
    </div>
  );
}
