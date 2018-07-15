require 'bcrypt'
require 'jwt'

class UserController < ApplicationController

    include BCrypt
    include JWT

    def login

    end

    def register

    end

    def register_verify

    end

    def forgotten_password

    end

    def forgotten_password_verify

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
