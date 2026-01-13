<?php
/**
 * credit: https://github.com/syamsoul/laravel-set-env
 */
namespace App\Core\Framework\Managers;


use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Contracts\Filesystem\FileNotFoundException;

class EnvManager
{
    private string $env_file_content = '';

    /**
     * @param string $env_file_path
     * @throws FileNotFoundException
     */
    public function __construct(
        private readonly string $env_file_path = ".env"
    )
    {
        $this->loadEnvContent();
    }

    /**
     * @param string|null $env_file_path
     * @return self
     * @throws FileNotFoundException
     */
    public static function init(string|null $env_file_path = null): self
    {
        if(is_null($env_file_path))
        {
            $env_file_path = app()->environmentFilePath();
        }

        return new static($env_file_path);
    }

    /**
     * @param string $key
     * @return string
     */
    public function get(string $key): string
    {
        $value = Str::of($this->env_file_content)->match("/^$key=(.*)$/m");

        if(Str::of($value)->startsWith('"')) $value = Str::of($value)->substr(1);

        if(Str::of($value)->endsWith('"')) $value = Str::of($value)->substr(0, -1);

        return $value;
    }

    /**
     * @param string $key
     * @param string|null $value
     * @return bool
     * @throws FileNotFoundException
     */
    public function set(string $key, ?string $value): bool
    {
        $new_env_var_final = "$key=\"$value\"";

        $is_already_exist = Str::of($this->env_file_content)->isMatch("/^$key=/m");

        if($is_already_exist)
        {
            $replaced_env = Str::of($this->env_file_content)->replaceMatches("/^$key=.*$/m", $new_env_var_final);

            File::put($this->env_file_path, $replaced_env);
        }
        else
        {
            $is_last_env_have_newline = Str::of($this->env_file_content)->isMatch("/\n$/");

            if(!$is_last_env_have_newline) $new_env_var_final = "\n$new_env_var_final";

            File::append($this->env_file_path, $new_env_var_final);
        }

        $this->loadEnvContent();

        return true;
    }

    /**
     * @return void
     * @throws FileNotFoundException
     */
    private function loadEnvContent(): void
    {
        $this->env_file_content = File::get($this->env_file_path);
    }
}
