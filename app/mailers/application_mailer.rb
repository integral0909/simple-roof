class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com', to: DESTINATION_EMAIL
  layout 'mailer'
end
