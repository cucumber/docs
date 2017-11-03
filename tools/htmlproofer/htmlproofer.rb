require 'html-proofer'
require 'os'

class SingleH1Check < HTMLProofer::Check
  IGNORE_PATHS = [
    'public/admin/index.html',
    'public/index.html'
  ]

  def run
    return if IGNORE_PATHS.include?(@path)

    count = 0
    @html.css('h1').each do |node|
      count += 1

      h1 = create_element(node)
      if h1.instance_variable_get('@text') == ''
        return add_issue("Empty h1 header. Does the source file have a title property in the front matter?")
      end

      if (count > 1)
        return add_issue("Multiple h1 headers.", h1.line)
      end
    end
    if (count == 0)
      return add_issue("Missing h1 header.")
    end
  end
end

# To speed up local development, external links are only checked in CI:
# https://app.netlify.com/sites/cucumber/settings/deploys
external_link_check = ENV['EXTERNAL_LINK_CHECK'] == 'true'
options = {
  disable_external: !external_link_check
}
HTMLProofer.check_directory('public', options).run
