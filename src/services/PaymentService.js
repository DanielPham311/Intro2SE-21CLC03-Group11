const { Account, User,Admin, SubscriptionPlan, Subscription, Bill, Episode, Season, Comment,CreditCard, MovieTrailer, WatchHistory,WatchList , Genre, Movie, Award} = require('../models'); // adjust the path to your models
async function addCreditCard(creditCardData) {
    try {
      return await CreditCard.create(creditCardData);
    } catch (error) {
      throw error;
    }
  }

  async function getCreditCardById(id) {
    try {
      return await CreditCard.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  async function updateCreditCard(id, updatedData) {
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

  async function deleteCreditCard(id) {
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

async function createInvoice(billData) {
    try {
      return await Bill.create(billData);
    } catch (error) {
      throw error;
    }
  }

  async function getInvoiceById(id) {
    try {
      return await Bill.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  async function updateInvoice(id, updatedData) {
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

  async function deleteInvoice(Bill_id) {
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

module.exports = {
    createInvoice: createInvoice,
    getInvoiceById: getInvoiceById,
    updateInvoice: updateInvoice,
    deleteInvoice: deleteInvoice,
}