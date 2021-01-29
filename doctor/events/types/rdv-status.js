export var RdvStatus;

(function (RdvStatus) {
  // When the Rdv has been created, but the
  // rdv it is trying to Rdv has not been reserved
  RdvStatus['Created'] = 'created';

  // The rdv the Rdv is trying to reserve has already
  // been reserved, or when the user has cancelled the Rdv.
  // The Rdv expires before payment
  RdvStatus['Cancelled'] = 'cancelled';

  // The Rdv has successfully reserved the rdv
  RdvStatus['AwaitingPayment'] = 'awaiting:payment';

  // The Rdv has reserved the rdv and the user has
  // provided payment successfully
  RdvStatus['Complete'] = 'complete';
})(RdvStatus || (RdvStatus = {}));
