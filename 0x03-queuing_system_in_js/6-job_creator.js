const kue = require('kue');
const queue = kue.createQueue();

// Job data
const jobData = {
  phoneNumber: '+1 (555) 123-4567',
  message: 'Hello, this is a test notification!'
};

// Create a new job in the 'push_notification_code' queue
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (!err) {
      console.log(`Notification job created: ${job.id}`);

      // Process the job
      job.on('complete', () => {
        console.log('Notification job completed');
      });

      job.on('failed', () => {
        console.log('Notification job failed');
      });
    } else {
      console.error('Failed to create notification job:', err);
    }
});
