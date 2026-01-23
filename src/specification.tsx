interface Specification {
  label: string;
  value: string | number;
  darkMode: boolean;
}

const SpecificationRow: (specification: Specification) => React.JSX.Element = (specification: Specification) => (
  <div className='flex justify-between'>
    <span
      className={
        `${specification.darkMode
          ? 'text-slate-400'
          : 'text-slate-600'
        } font-medium`
      }>
      {specification.label}:
    </span>
    <span
      className={
        `font-bold
          ${specification.darkMode
          ? 'text-white'
          : 'text-slate-900'}`
      }>
      {specification.value}
    </span>
  </div>
);

export default SpecificationRow;
