<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'gender101');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'BJc-28;lN>5b8V*P%zp}lv/MvaY`HZl`!|15m!IFX;AR1Hz4w>=bzN09,Bcp;d7m');
define('SECURE_AUTH_KEY',  '6CxHAQSn0?YX.e2dqz98?*76MgY)7] ;NAeY-Qk2~O36;rwy}W>8IEr!bN 0RJu:');
define('LOGGED_IN_KEY',    'P&yW_XT)3<@X*pxzB=beZ2.].jy7]E|$^]eV~.~Ovfalz!R4K&[^)eD%uZZ}w^Qn');
define('NONCE_KEY',        'IL|}%$>oM,g@@am6F4]D7T.<@[q+/|`mX5Km~MdeRT<7e$5b?TXJo.83F )+`wrs');
define('AUTH_SALT',        'V~A4AkWsXMY@Dj&vFwu>37|Vwg`YY MFJjGUz_)iNp6HCYBJprRY^A+KZ{e6(z#P');
define('SECURE_AUTH_SALT', '7CGf#AiPb:d*ndP5MR$*j+,!H1DGicsFQ*%,f*v`)9vY&BzQ&jN*}O7f7OK=X5Qn');
define('LOGGED_IN_SALT',   '$(Ci4rqe x4S`,<H16#h@AINh4+*scC6Y.q}j_BkLeA%Y#mXxzxnfy-A6%i35QE^');
define('NONCE_SALT',       '|EUi67n0%Z0G>Kr9?:m:;BKUCp }0+N?jqmEdXbQ9xA-:`d:C0+:`I{>:oHtUTrN');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'g1_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
