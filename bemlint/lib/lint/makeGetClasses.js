'use strict';

const { ClassType } = require('./classType');

const makeGetClasses = ({ elementDivider, modifierDivider }) => {
  const blockFilter = (cls) => (
    !cls.includes(elementDivider) && !cls.includes(modifierDivider)
  );

  const elementFilter = (cls) => (
    cls.includes(elementDivider) && (
      !cls.split(elementDivider)[1].includes(modifierDivider)
    )
  );

  const modifierFilter = (cls) => (
    cls.includes(elementDivider)
      ? cls.split(elementDivider)[1].includes(modifierDivider)
      : cls.includes(modifierDivider)
  );

  const filterByClass = {
    [ClassType.Block]: blockFilter,
    [ClassType.Element]: elementFilter,
    [ClassType.Modifier]: modifierFilter,
  };

  const getClassesByType = (node, classType) => {
    if (!node.attrs) {
      return [];
    }

    const attrClass = node.attrs.find(attr => attr.name === 'class');

    if (!attrClass) {
      return [];
    }

    const classes = attrClass.value.split(' ');

    return classes.filter(filterByClass[classType]);
  };

  return (node) => ({
    blocks: getClassesByType(node, ClassType.Block),
    elements: getClassesByType(node, ClassType.Element),
    modifiers: getClassesByType(node, ClassType.Modifier),
  });
};

module.exports = {
  makeGetClasses,
};
