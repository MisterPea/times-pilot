import Handlebars from "handlebars";
import { emailTemplate } from "./email_html/dynamicEmailTemplate.js";
import { config } from 'dotenv';
import { Resend } from "resend";
config();
const resendKey = process.env.RESEND_KEY;
const resend = new Resend( resendKey );

function delay( ms ) {
  return new Promise( resolve => setTimeout( resolve, ms ) );
}

export async function renderEmailHtml( usersData ) {
  const dateWithSuffix = ( day ) => {
    const lastChar = day.substring( day.length - 1 );
    switch ( lastChar ) {
      case "1":
        return `${day}st`;
      case "2":
        return `${day}nd`;
      case "3":
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const today = new Date();
  const month = today.toLocaleString( "default", { month: "long" } );
  const day = dateWithSuffix( `${today.getDate()}` );
  const year = today.getFullYear();
  const date = `${month} ${day}, ${year}`;

  for ( const user of usersData ) {
    if ( user.searchArticles.length === 0 ) continue;
    const template = Handlebars.compile( emailTemplate );
    const html = template( { date: date, ...user } );
    const { email } = user;
    await sendEmail( email, date, html );
    await delay( 1000 );
  }
}

async function sendEmail( email, date, htmlData ) {
  const { data, error } = await resend.emails.send( {
    from: 'Perry Angelora <timespilot@misterpea.me>',
    to: email,
    subject: `Your personalized briefing for ${date}`,
    html: htmlData
  } );

  if ( error ) {
    return console.error( { error } );
  }

  console.log( 'EMAIL SENT:', email, { data } );

}

