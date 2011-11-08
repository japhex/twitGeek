# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
TwitGeekRails::Application.initialize!

ActionMailer::Base.smtp_settings = {
  :user_name => "app1419341@heroku.com",
  :password => "is8ivqpb",
  :domain => "twitgeek.heroku.com",
  :address => "smtp.sendgrid.net",
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}