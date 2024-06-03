import ColorDot from '../../../../components/chip/ColorCircle/ColorDot';

interface ColumnHeaderProps {
  name: string;
}
function ColumnHeader({ name }: ColumnHeaderProps) {
  return (
    <>
      <ColorDot color="var(--violet-violet_5534DA, #5534DA)" />
      <div>{name}</div>
      <div>number chip</div>
      <button type="button">
        <img src="icon/setting.svg" alt="setting_button" />
      </button>
    </>
  );
}

export default ColumnHeader;
