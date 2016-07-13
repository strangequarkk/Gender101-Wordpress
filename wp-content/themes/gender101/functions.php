<?php
    if ( is_admin() ) {
        add_action('wp_ajax_nopriv_get_next_point', 'get_next_point_callback');
        add_action('wp_ajax_get_next_point', 'get_next_point_callback');
        add_action('wp_ajax_nopriv_get_child_posts', 'get_child_posts_callback');
        add_action('wp_ajax_get_child_posts', 'get_child_posts_callback');
    }


function get_child_posts(){

    global $post;
    $childIDs = $_POST['childIDs'];
    //echo $_POST['childIDs'];
    echo $childIDs;
    //$wqArgs = array("include" => $childIDs);
    //echo($wqArgs);
    //$postArr = get_posts($wqArgs);
    $postArr = new WP_Query( array(
        'post__in' => $childIDs
    ));
    //print_r($postArr);
    foreach($postArr as $post){
        setup_postdata( $post );
        //print_r($post);
        get_template_part( 'single-point', 'content' );
        wp_reset_post_data();
    }

    wp_die();
}


    function get_next_point_callback(){

        global $post;
        $destID = intval($_POST['destID']);

        $post = get_post($destID);
        setup_postdata( $post );

        get_template_part( 'single-point', 'content' );
        wp_reset_post_data();
        wp_die();
    }


    add_action( 'after_setup_theme', 'blankslate_setup' );
    function blankslate_setup()
    {
        load_theme_textdomain( 'blankslate', get_template_directory() . '/languages' );
        add_theme_support( 'title-tag' );
        add_theme_support( 'automatic-feed-links' );
        add_theme_support( 'post-thumbnails' );

        global $content_width;
        if ( ! isset( $content_width ) ) $content_width = 640;
        register_nav_menus(
            array( 'main-menu' => __( 'Main Menu', 'blankslate' ) )
        );
    }

    add_action( 'wp_enqueue_scripts', 'blankslate_load_scripts' );
    function blankslate_load_scripts()
    {
      //  wp_enqueue_script( 'jquery' );

        wp_enqueue_script('carosel',  get_bloginfo('template_directory').'/js/sqslider.js', array('jquery') );
        wp_enqueue_script( 'ajax-script', get_bloginfo('template_directory').'/js/get_next_point.js', array('jquery') );

        // in JavaScript, object properties are accessed as ajax_object.ajax_url, ajax_object.we_value
        wp_localize_script( 'ajax-script', 'ajax_object',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'we_value' => 1234 ) );
    }

    add_action( 'comment_form_before', 'blankslate_enqueue_comment_reply_script' );
    function blankslate_enqueue_comment_reply_script()
    {
        if ( get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }
    }

    add_filter( 'the_title', 'blankslate_title' );
    function blankslate_title( $title ) {
        if ( $title == '' ) {
            return '&rarr;';
        } else {
            return $title;
        }
    }

    add_filter( 'wp_title', 'blankslate_filter_wp_title' );
    function blankslate_filter_wp_title( $title )
    {
        return $title . esc_attr( get_bloginfo( 'name' ) );
    }

    add_action( 'widgets_init', 'blankslate_widgets_init' );
    function blankslate_widgets_init()
    {
        register_sidebar( array (
            'name' => __( 'Sidebar Widget Area', 'blankslate' ),
            'id' => 'primary-widget-area',
            'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
            'after_widget' => "</li>",
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>',
        ) );
    }

    function blankslate_custom_pings( $comment )
    {
        $GLOBALS['comment'] = $comment;
            ?>
            <li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
            <?php
    }

    add_filter( 'get_comments_number', 'blankslate_comments_number' );
    function blankslate_comments_number( $count )
    {
        if ( !is_admin() ) {
            global $id;
            $comments_by_type = &separate_comments( get_comments( 'status=approve&post_id=' . $id ) );
            return count( $comments_by_type['comment'] );
        } else {
            return $count;
        }
    }