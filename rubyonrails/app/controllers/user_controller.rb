require 'bcrypt'
require 'jwt'

class UserController < ApplicationController

    include BCrypt
    include JWT

    def login
        @user = User.find_by_email(params[:email])
        password = BCrypt::Password.new(@user.password)
        if password == params[:password]
            #
        else
            render json: {   }, status: 400
        end
    end

    def register

    end

    def register_verify

    end

    def forgotten_password

    end

    def forgotten_password_verify

    end

    def user_by_id
        render json: User.find({ id: params[:id] }), status: 200
    end

    private
    def hasher
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQSTRUVWXYZ1234567890-=!@#$%^&*()_+"
        hash = ''
        for (0..40) do
            idx = rand(chars.length) + 1
            hash += chars[idx]
        end
        return hash
    end

end
