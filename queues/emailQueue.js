const Queue = require("better-queue");
const sendEmail = require("../utils/sendEmail");

const emailQueue = new Queue(
  async (job, cb) => {
    try {
      await sendEmail(job.to, job.subject, job.text);
      cb(null, { success: true }); 
    } catch (err) {
      cb(err);
    }
  },
  {
    concurrent: 3, 
    maxRetries: 3, 
  }
);

module.exports = emailQueue;
