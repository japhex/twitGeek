# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
TwitGeekRails::Application.initialize!

ActionMailer::Base.smtp_settings = {
  :user_name => "app1419341@heroku.com",
  :password => "autumn69",
  :domain => "twitgeek.heroku.com",
  :address => "smtp.sendgrid.net",
  :port => '25',
  :authentication => :plain,
  :enable_starttls_auto => true
}