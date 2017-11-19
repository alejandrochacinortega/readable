import moment from 'moment';

export const formatDate = timestamp => {
  return moment(new Date(timestamp)).format('MMM Do YY');
};
