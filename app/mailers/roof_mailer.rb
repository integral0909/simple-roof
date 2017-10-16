class RoofMailer < ApplicationMailer
  def estimation(roof)
    @roof = roof

    mail(from: roof.email, subject: "New roof estimation request from #{roof.name}")
  end
end
