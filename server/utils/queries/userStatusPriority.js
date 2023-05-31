export const userStatusPriority = (
  statusField = 'status',
  selectedPriority = 1,
  shortlistedPriority = 2,
  registeredPriority = 3,
  rejectedPriority = 4
) => {
  return {
    $switch: {
      branches: [
        {
          case: { $eq: ['$' + statusField, 'selected'] },
          then: selectedPriority,
        },
        {
          case: { $eq: ['$' + statusField, 'shortlisted'] },
          then: shortlistedPriority,
        },
        {
          case: { $eq: ['$' + statusField, 'registered'] },
          then: registeredPriority,
        },
        {
          case: { $eq: ['$' + statusField, 'rejected'] },
          then: rejectedPriority,
        },
      ],
      default: 5,
    },
  };
};
