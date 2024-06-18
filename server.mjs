import { createServer } from "node:http";
import next from "next";
import { parse } from "url";
import { Server as ServerIO } from "socket.io";
import { PrismaClient } from '@prisma/client'  
// Import the necessary modules
import { DateTime } from 'luxon';

const prismaServerGlobal = new PrismaClient()  
// use `prisma` in your application to read and write data in your DB

const dev = process.env.NODE_ENV !== 'production';
// const hostname = 'liltrees.onrender.com';
const hostname = process.env.CUM;
console.log(process.env.NODE_ENV)
console.log(process.env.CUM)
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
app.prepare().then(() => {
  // const pathToServer = "/server";
  const httpServer = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === '/' ) {
        await app.render(req, res, '/')
      } else {
        await handler(req, res, parsedUrl, query)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
  .once('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`> Cat is now running on ${hostname}:${port}`)
  })

  const io = new ServerIO(httpServer,{
    addTrailingSlash: false,
    connectionStateRecovery: {
      // the backup duration of the sessions and the packets
      maxDisconnectionDuration: 2 * 60 * 1000,
      // whether to skip middlewares upon successful recovery
      skipMiddlewares: true,
    },
    // path: pathToServer
  });


  io.on("connection", (socket) => {
    console.log("This is from server")
    socket.emit("hello", "this is server socket, say cheese");

    socket.on("personal-subcribe", function(arg1_userId) {
      try{
        // console.log('[socket]','join room :',arg1_userId)
        socket.join(arg1_userId);
        io.to(arg1_userId).emit(arg1_userId, socket.id,"this is from server personal notification");
      }catch(e){
        console.log('[error]','join room :',e);
        socket.emit('error',"compromised socket detected",'couldnt perform requested action');
      }
    })
    socket.on("channel-input",function(arg1_channelId,arg2_message_item,arg3_type_channel) {
      // console.log("data from channel input",arg1_channelId,arg2_message_item.content,arg3_type_channel);
      // socket.broadcast.emit(arg1,arg2);
      try {
        socket.emit(arg1_channelId,arg2_message_item,arg3_type_channel)
      }
      catch(e){
        console.log('[error]','channel-input',e);
        socket.emit('error',"compromised socket detected",'couldnt perform requested action');
      }
      })
  
    socket.on("channel-update",function(arg1_channelId,arg2_message_item) {

      socket.emit(arg1_channelId,arg2_message_item)
      })
    socket.on("channel-typing",function(arg1_channelId,arg2_identity) {

      socket.emit(arg1_channelId,arg2_identity)
      })
        // console.log(`data from server.mjs is`,arg1_user_recipient_id,"\n",arg2_user_request);
      // io.emit("calling_user_"+arg2_user_request.id,arg2_user_request);
      
    socket.on("calling_user",async function(arg1_user_recipient_id,arg2_user_request){
      io.to(arg1_user_recipient_id).emit("calling_user_"+arg1_user_recipient_id,arg2_user_request);
      prismaServerGlobal.userNotification.create({
        data: {          
          data: arg2_user_request.name + " called you at " + new Date(),
          userProfileId: arg1_user_recipient_id
        }
      }).then()
    })
    
    // console.log(io.sockets.adapter.rooms);
    // socket.onAny((event, ...args) => {
    //   // console.log(`got ${event}`);
    //   // console.log(`data from server.mjs is ${args}`);
    // });
  });
})

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Flushing database connections and shutting down gracefully...');
  await prismaServerGlobal.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Flushing database connections and shutting down gracefully...');
  await prismaServerGlobal.$disconnect();
  process.exit(0);
});

// This example uses Express to receive webhooks
import express from 'express';
const app2 = express();

// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
app2.post('/webhooks', express.json({type: 'application/json'}), async (request, response) => {
  const event = request.body;

  // Handle the event
  switch (event.type) {
    case 'customer.created':
      await handleCustomerUpdate(event.data.object);
      response.json({ received: true });
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      response.json({ received: true });
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      response.json({ received: true });
      break;
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object);
      response.json({ received: true });
      break;
    case 'customer.deleted':
      handleCustomerDeleted(event.data.object);
      response.json({ received: true });
      break;
    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object);
      response.json({ received: true });
      break;

    case 'product.created':
    case 'product.updated':
    case 'product.deleted':
      handleProductEvent(event.data.object);
      response.json({ received: true });
      break;
    case 'customer.updated':
    case 'invoice.created':
    case 'invoice.finalized':
    case 'invoice.paid':
    case 'invoice.payment_succeeded':
    case 'billing_portal.session.created':
    case 'plan.created':
    case 'plan.updated':
    case 'price.created':
    case 'price.updated':
    case 'billing_portal.configuration.updated':
      // response.json({ received: true });
      handleIgnoredEvent(event);
      response.json({ received: true });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
      console.log("Unhandled event\n", event.data.object);
      response.json({ received: true });

          // Send a 200 response to acknowledge receipt of the event
    
  }

  // Return a response to acknowledge receipt of the event
  // response.json({ received: true });

});

async function handleSubscriptionDeleted(subscriptionDeleted) {
  console.log("customer.subscription.deleted\n", subscriptionDeleted.customer);
  console.log("Id subscription delete", subscriptionDeleted.id);
  if(subscriptionDeleted.cancellation_details.reason != "null")
  {
    const updatingSubscription = await prismaServerGlobal.subscription.delete({
      where: {
        id: subscriptionDeleted.id
      }
    })
    const removeUserBilling = await prismaServerGlobal.userBilling.delete({
      where: {
        customerId: subscriptionDeleted.customer
      }
    })
  }
}

async function handleSubscriptionUpdated(subscriptionCan) {
  console.log("customer.subscription.updated", subscriptionCan.customer);
  console.log("Id subscription", subscriptionCan.id);
  // if(subscriptionCan.cancellation_details.reason == "cancellation_requested" && subscriptionCan.cancellation_details.reason != "null")
  if(subscriptionCan.cancellation_details.reason != "null")
  {
    const updatingSubscription = await prismaServerGlobal.subscription.delete({
      where: {
        id: subscriptionCan.id
      }
    })
    const removeUserBilling = await prismaServerGlobal.userBilling.delete({
      where: {
        customerId: subscriptionCan.customer
      }
    })
  }
}

async function handleCheckoutSessionCompleted(customerForDatabase) {
  const customerIdSession = customerForDatabase.customer;
  const subscriptionIdSession = customerForDatabase.subscription;
  const emailSubscription = customerForDatabase.customer_details.email;
  console.log("User checkout.session.completed subscription", customerIdSession);
  console.log("Check out session id for billing", customerForDatabase.id);
  console.log("User email", emailSubscription);
  console.log("User subscription id", subscriptionIdSession);
  let attempts = 0,maxAttempts = 3;

  
  while (attempts < maxAttempts) {
    try {
      const currentSubscription = await prismaServerGlobal.subscription.update({
        where: {
          id: subscriptionIdSession,
        },
        data: {
          isActive: true
        }
      });
      console.log("current subscription", currentSubscription);
      return currentSubscription; // Exit if successful
    } catch (error) {
      attempts++;
      if (attempts < maxAttempts) {
        console.log(`Attempt ${attempts} failed. Retrying in 3 seconds...`);
        await delay(3000); // Wait for 3 seconds before retrying
      } else {
        console.log(`Attempt ${attempts} failed. No more retries left.`);
        throw error; // Re-throw the error if all attempts fail
      }
    }
  }

}

function handleCustomerDeleted(customerDelete) {
  console.log("User id for billing delete", customerDelete.id);
  console.log("User email for deletion", customerDelete.email);
}

async function handleSubscriptionCreated(customerSubscriptionCreated) {
  const customerBillingId = customerSubscriptionCreated.customer;
  const subscriptionId = customerSubscriptionCreated.id;
  const productBillingId = customerSubscriptionCreated.plan.product;
  const subscriptionBeginDate = DateTime.fromSeconds(customerSubscriptionCreated.start_date).toISO();
  const subscriptionEndDate = DateTime.fromSeconds(customerSubscriptionCreated.trial_end).toISO();
  console.log("Subscription id", subscriptionId);
  console.log("User billing id", customerBillingId);
  console.log("Product id", productBillingId);
  console.log("Subscription began date", subscriptionBeginDate);
  console.log("Subscription end date", subscriptionEndDate);

  let attempts = 0,maxAttempts = 3;
  while (attempts < maxAttempts) {
    try {
    // const oldUserBilling = await prismaServerGlobal.userBilling.findMany({
    //   where: {
    //   }
    // })
    // const oldSubscription = await prismaServerGlobal.subscription.findMany({
    //   where: {
    //   }
    // })
    // const subscription = await stripe.subscriptions.cancel(
    //   'sub_1MlPf9LkdIwHu7ixB6VIYRyX'
    // );
    const testing = await prismaServerGlobal.subscription.create({
      data: {
        id: subscriptionId,
        customerId: customerBillingId,
        at: subscriptionBeginDate,
        until: subscriptionEndDate,
        isActive: false,
        productId: productBillingId
      }
    });

    console.log("Created subscript record", testing);
  }
  catch (error) {
    if(error == 'unhandledRejection')
    break;
    console.log(error)
    attempts++;
    if (attempts < maxAttempts) {
      console.log(`Attempt ${attempts} failed. Retrying in 2 seconds...`);
      await delay(2000); // Wait for 3 seconds before retrying
    } else {
      console.log(`Attempt ${attempts} failed. No more retries left.`);
      throw error; // Re-throw the error if all attempts fail
    }
  }
}
}

async function handleCustomerUpdate(customerUser2) {
  const customerBillingId2 = customerUser2.email;
  const subscriptionId2 = customerUser2.id;
  console.log("Current information", customerBillingId2, subscriptionId2);
  await updateUserBilling(customerBillingId2, subscriptionId2);
}

function handleProductEvent(productSth) {
  console.log("from server product did sth\n", productSth);
}

function handleIgnoredEvent(ignoredEvent) {
  console.log("Ignored", ignoredEvent.type);
  return ;
}


app2.listen(4242, () => console.log('Running server stripe on port 4242'));

async function updateUserBilling(emailSubscription2, customerId2) {
  console.log(emailSubscription2,"this is from user")
  try {
    const user2 = await prismaServerGlobal.userProfile.findFirst({
      where: {
        email: emailSubscription2,
        
      }
    });

    if (user2) {
      console.log("User from updateUserBilling",user2)
      try {
        const createdUser = await prismaServerGlobal.userBilling.create({
          data: {
            customerId: customerId2,
            userProfile: {
              connect: {
                id: user2.id,
                email: user2.email
              }
            }
          }
        });

        
        console.log("User from updateUserBilling created",createdUser)
      }
      catch(e)  {
        console.log("Error on server updateUserBilling",e)
        process.exit(0);
      }
      // userProfileId2: user2.id,
      
    } else {
      console.error(`User with email ${emailSubscription2} not found.`);
    }
  } catch (error) {
    console.error("Error updating user billing:", error);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}