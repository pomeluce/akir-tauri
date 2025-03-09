import classNames from 'classnames';
import { MouseEvent, MouseEventHandler } from 'react';

interface ICheckedOption {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Checked: React.FC<{ className?: string; defaultValue?: string | number; options: ICheckedOption[]; onChange?: (value: string | number) => void }> = props => {
  const { className, defaultValue, options, onChange } = props;

  const [value, setValue] = useState<string | number | undefined>(defaultValue);

  const handleClick = (val: string | number, e: MouseEvent<HTMLButtonElement>, click?: MouseEventHandler<HTMLButtonElement>) => {
    click?.(e);
    onChange?.(val);
    setValue(val);
  };

  return (
    <div className={classNames(['border border-rim2 rounded-md overflow-hidden text-sm', className])}>
      {options.map((option, index) => (
        <button
          key={`${index}-${option.value}`}
          className={classNames(['inline-flex items-center gap-0.5 px-2 py-1', value === option.value && 'bg-primary6 text-white'])}
          onClick={e => handleClick(option.value, e, option.onClick)}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};
export default Checked;
