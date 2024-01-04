const { Account, User,Admin, SubscriptionPlan, Subscription, Bill, Episode, Season, Comment,CreditCard, MovieTrailer, WatchHistory,WatchList , Genre, Movie, Award} = require('../models'); // adjust the path to your models
const PaymentService = {};
PaymentService.addCreditCard = async (creditCardData) => {
    try {
      return await CreditCard.create(creditCardData);
    } catch (error) {
      throw error;
    }
  }

  PaymentService.getCreditCardById = async (id) => {
    try {
      return await CreditCard.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  PaymentService.updateCreditCard = async (id, updatedData) => {
    try {
      let creditCard = await CreditCard.findByPk(id);
      if (!creditCard) {
        throw new Error('Credit card not found');
      }
      return await creditCard.update(updatedData);
    } catch (error) {
      throw error;
    }
  }

  PaymentService.deleteCreditCard = async (id) => {
    try {
      let creditCard = await CreditCard.findByPk(id);
      if (!creditCard) {
        throw new Error('Credit card not found');
      }
      return await creditCard.destroy();
    } catch (error) {
      throw error;
    }
  }

PaymentService.createInvoice = async (billData) => {
    try {
      return await Bill.create(billData);
    } catch (error) {
      throw error;
    }
  }

  PaymentService.getInvoiceById = async (id) => {
    try {
      return await Bill.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  PaymentService.updateInvoice = async (id, updatedData) => {
    try {
      let bill = await Bill.findByPk(id);
      if (!bill) {
        throw new Error('Bill not found');
      }
      return await bill.update(updatedData);
    } catch (error) {
      throw error;
    }
  }

  PaymentService.deleteInvoice = async (Bill_id) => {
    try {
      let bill = await Bill.findByPk(Bill_id);
      if (!bill) {
        throw new Error('Bill not found');
      }
      return await bill.destroy();
    } catch (error) {
      throw error;
    }
  }

module.exports = PaymentService;