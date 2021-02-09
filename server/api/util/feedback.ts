import Router from "koa-router";
import nodemailer from "nodemailer";

let mailer = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "jack@jacktolley.com",
    pass: "LetsNotPutThePasswordOnAPublicGit",
  },
});

export function feedback(): Router {
  const router = new Router();

  router.post("/feedback", async (ctx, next) => {
    const { shop } = ctx.session;
    await mailer.sendMail({
      from: "jack@jacktolley.com",
      to: "jack@jacktolley.com",
      subject: `Feedback email from ${shop} + ${ctx.request.body.email}`,
      text: ctx.request.body.message,
    });

    ctx.response.status = 204;
  });

  return router;
}
