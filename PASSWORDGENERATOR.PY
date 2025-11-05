import secrets
import string

def generate_strong_password(length=12):
    """Generates a strong, random password."""
    # Define the possible characters
    alphabet = string.ascii_letters
    digits = string.digits
    punctuation = string.punctuation
    
    # Combine all characters into one pool
    all_characters = alphabet + digits + punctuation
    
    # Ensure at least one character type is included to meet strength requirements
    while True:
        password = ''.join(secrets.choice(all_characters) for _ in range(length))
        if (any(char.islower() for char in password) and
            any(char.isupper() for char in password) and
            any(char.isdigit() for char in password) and
            any(char in punctuation for char in password)):
            break
            
    return password

# Example usage:
password_length = 16 # You can change the length here
new_password = generate_strong_password(password_length)
print(f"Generated Password: {new_password}")
