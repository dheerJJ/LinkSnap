import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedIcon from './AnimatedIcon';
import CustomSelect from './CustomSelect';

export default function SearchFilterBar({ onSearch, onFilter, onSort, activeStatus = 'all', activeSort = 'date' }) {
  const [searchValue, setSearchValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const sortOptions = [
    { value: 'date', label: 'Newest first' },
    { value: 'clicks', label: 'Most clicks' },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
    }}>
      {/* Search */}
      <motion.div
        animate={{ width: isExpanded ? 280 : 200 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative' }}
      >
        <div style={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          color: 'var(--text-tertiary)', pointerEvents: 'none',
        }}>
          <AnimatedIcon name="search" size={16} trigger="none" />
        </div>
        <input
          type="text"
          placeholder="Search links..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
          className="input focus-ring"
          style={{ paddingLeft: 36, fontSize: 'var(--font-size-sm)' }}
        />
      </motion.div>

      {/* Status filter */}
      <div style={{ display: 'flex', gap: 2, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: 2 }}>
        {[
          { value: 'all', label: 'All' },
          { value: 'active', label: 'Active' },
          { value: 'expired', label: 'Expired' },
        ].map((filter) => (
          <motion.button
            key={filter.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilter?.(filter.value)}
            className="focus-ring"
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              background: activeStatus === filter.value ? 'var(--bg-elevated)' : 'transparent',
              color: activeStatus === filter.value ? 'var(--text-primary)' : 'var(--text-tertiary)',
              transition: 'all 0.15s',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>

      {/* Modern Custom Dropdown */}
      <CustomSelect
        options={sortOptions}
        value={activeSort}
        onChange={(val) => onSort?.(val)}
      />
    </div>
  );
}
