export var Subjects;

(function (Subjects) {
  Subjects['DoctorCreated'] = 'doctor:created';
  Subjects['DoctorUpdated'] = 'doctor:updated';

  Subjects['RdvCreated'] = 'rdv:created';
  Subjects['RdvCancelled'] = 'rdv:cancelled';

  Subjects['ExpirationComplete'] = 'expiration:complete';

  Subjects['PaymentCreated'] = 'payment:created';
})(Subjects || (Subjects = {}));
