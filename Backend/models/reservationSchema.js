const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
   clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
   cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
   dateReservation: {
       type: Date,
       default: Date.now,
       validate: {
           validator: function(value) {
               return value <= this.datePriseEnCharge;
           },
           message: "La date de réservation doit être antérieure à la prise en charge"
       }
   },
   datePriseEnCharge: {
       type: Date,
       required: [true, "La date/heure de prise en charge est obligatoire"],
       validate: {
           validator: function(value) {
               return value < this.dateRetour;
           },
           message: "La date de prise en charge doit être antérieure au retour"
       }
   },
   dateRetour: {
       type: Date,
       required: [true, "La date/heure de retour est obligatoire"],
       validate: {
           validator: function(value) {
               const minDuration = 24 * 60 * 60 * 1000; // 24 heures minimum
               return (value - this.datePriseEnCharge) >= minDuration;
           },
           message: "La durée minimum de location est 24 heures"
       }
   },
   prixTotal: {
       type: Number,
       required: [true, "Le prix total est obligatoire"],
       min: [0.01, "Le prix doit être supérieur à 0"]
   },
   statut: {
       type: String,
       enum: {
           values: ['confirmée', 'en cours', 'terminée', 'annulée'],
           message: "Statut {VALUE} non valide"
       },
       default: 'confirmée'
   },
   paiement: {
       methode: {
           type: String,
           enum: ['carte', 'espèces', 'virement', 'en ligne']
       },
       statut: {
           type: String,
           enum: ['payé', 'en attente', 'remboursé', 'partiel'],
           default: 'en attente'
       }
   }
}, {
   timestamps: true,
   toJSON: {
       virtuals: true,
       transform: function(doc, ret) {
           ret.dateReservation = doc.dateReservation.toISOString();
           ret.datePriseEnCharge = doc.datePriseEnCharge.toISOString();
           ret.dateRetour = doc.dateRetour.toISOString();
           return ret;
       }
   },
   toObject: { virtuals: true }
});

reservationSchema.virtual('duree.heures').get(function() {
   return Math.ceil((this.dateRetour - this.datePriseEnCharge) / (1000 * 60 * 60));
});

reservationSchema.virtual('duree.jours').get(function() {
   return Math.ceil((this.dateRetour - this.datePriseEnCharge) / (1000 * 60 * 60 * 24));
});

reservationSchema.pre('save', async function(next) {
   const conflictingReservation = await this.constructor.findOne({
       cars: { $in: this.cars }, // Adjusted to use the correct field for cars
       $or: [
           { datePriseEnCharge: { $lte: this.dateRetour }, dateRetour: { $gte: this.datePriseEnCharge } },
           { datePriseEnCharge: { $lte: this.datePriseEnCharge }, dateRetour: { $gte: this.dateRetour } }
       ]
   });

   if (conflictingReservation) {
       next(new Error('Conflit de dates avec une réservation existante'));
   } else {
       next();
   }
});

module.exports = mongoose.model('Reservation', reservationSchema);
