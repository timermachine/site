import React from 'react';
import useCollapse from 'react-collapsed';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
/*
Panelordion -like an accordion but simpler - a single collapsible, expandable panel.

https://blog.logrocket.com/create-collapsible-react-components-react-collapsed/

driven by hasInterval:
false:
    V interval
true
    ^ [interval edit]  [x] alert
    H : M : S          [x] announce

*/
const Collapse = ({ children, title }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="collapsible">
      <div className="pl-2 inline-flex" {...getToggleProps()}>
        <motion.div
          title={title}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}>
          {isExpanded ? (
            <div>
              <FiChevronUp className="mt-1 text-2xl text-amber-500" />
            </div>
          ) : (
            <div className="flex items-start">
              <FiChevronDown className="mt-1 mr-1 text-2xl text-amber-500" />{' '}
              <span className="text-xs mt-2">{title}</span>
            </div>
          )}
        </motion.div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Collapse;
