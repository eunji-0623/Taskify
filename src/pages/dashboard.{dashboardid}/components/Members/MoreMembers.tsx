import styles from './MoreMembers.module.scss';

interface MoreMembersProps {
  plusN: number;
}

function MoreMembers({ plusN } : MoreMembersProps) {
  return (
    <div className={styles.MoreMembers} style={{ background: '#F4D7DA' }}>
      <span className={styles.MoreMembersText}>
        +
        {plusN}
      </span>
    </div>
  );
}

export default MoreMembers;
