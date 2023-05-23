export const companyStatusPriority = (
  statusField = 'currentStatus',
  registrationOpenPriority = 1,
  registrationClosedPriority = 2,
  shortlistingPriority = 3,
  completedPriority = 4
) => {
  return {
    $switch: {
      branches: [
        {
          case: { $eq: ['$' + statusField, 'registration open'] },
          then: registrationOpenPriority,
        },
        {
          case: { $eq: ['$' + statusField, 'registration closed'] },
          then: registrationClosedPriority,
        },
        {
          case: { $eq: ['$' + statusField, 'shortlisting'] },
          then: shortlistingPriority,
        },
        {
          case: { $eq: ['$' + statusField, 'completed'] },
          then: completedPriority,
        },
      ],
      default: 5,
    },
  };
};
